import { IReport } from '@/models';
import { isUndefined, useEffectAsync } from '@/utils';
import { useCallback, useState } from 'react';
import { useReportClient } from './useReportClient';

export type UseReportsResult = {
    /** List of reports */
    reports: IReport[] | undefined;
    /** Whether list is loading */
    isLoading: boolean;
    /** Load messages with filtering or sorting based on any catergory */
    loadReports: () => void;
    /** Refresh messages to update the list with filter or sort applied */
    refreshReports: () => void;
};

// TODO: add sort and filter category in the parameter of useReports()
export const useReports = (): UseReportsResult => {
    const reportClient = useReportClient();

    const [reports, setReports] = useState<IReport[] | undefined>([]);
    const isLoading = isUndefined(reports);

    // TODO: add sort and filter category here
    const loadReports = useCallback(async () => {
        const result = await reportClient.listReports();
        setReports(result?.reports!);
    }, [reportClient, setReports]);

    const refreshReports = useCallback(async () => {
        setReports(undefined);
        await loadReports();
    }, [loadReports, setReports]);

    // Load automatically on entering page
    useEffectAsync(async () => {
        await loadReports();
    }, []);

    return {
        reports,
        isLoading,
        loadReports,
        refreshReports,
    };
};

import { IReport } from '@/models';
import { isUndefined, useEffectAsync } from '@/utils';
import { useCallback, useState } from 'react';
import { useReportClient } from './useReportClient';
import { GridFilterItem } from '@mui/x-data-grid';

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
export const useReports = (queryOptions?: GridFilterItem[]): UseReportsResult => {
    const reportClient = useReportClient();

    const [reports, setReports] = useState<IReport[] | undefined>(undefined);
    const isLoading = isUndefined(reports);

    // TODO: add sort and filter category here
    const loadReports = useCallback(async () => {
        if (queryOptions?.length !== 0) {
            // field: the report field that was applied a filter; value: the filter value
            const { field, value } = queryOptions![0];
            console.log(field, value);
            //TODO: use enum here for reportField
            if (field === 'statusOfReport' && value) {
                const result = await reportClient.listReportsByStatus(value);
                setReports(result?.reports!);
                // console.log(result)
            }
        } else {
            const result = await reportClient.listReports();
            setReports(result?.reports!);
        }
    }, [reportClient, setReports, queryOptions]);

    const refreshReports = useCallback(async () => {
        setReports(undefined);
        await loadReports();
    }, [loadReports, setReports]);

    // Load automatically on entering page
    useEffectAsync(async () => {
        await loadReports();
    }, [loadReports]);

    return {
        reports,
        isLoading,
        loadReports,
        refreshReports,
    };
};

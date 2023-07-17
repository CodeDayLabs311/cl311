import { IReport } from '@/models';
import { isUndefined, useEffectAsync } from '@/utils';
import { useCallback, useState } from 'react';
import { useReportClient } from './useReportClient';

export type UseReportsResult = {
    /** Reports */
    reports: IReport[] | undefined;
    /** Whether reports are loading */
    isLoading: boolean;
    /** Load reports with category filter, without clearing cache */
    loadReports: () => void;
    /** Refresh reports with category filter, clearing cache */
    refreshReports: () => void;
};

/**
 * Hook to load and interact with a report list
 * By using a hook for this common operation, we can avoid redundant code
 * If we add additional features (deleting, error handling, etc.) all pages will benefit
 * at the same time!
 */
export const useReports = (categoryFilter: string): UseReportsResult => {
    const reportClient = useReportClient();

    const [reports, setReports] = useState<IReport[] | undefined>([]);
    const isLoading = isUndefined(reports);

    const loadReports = useCallback(async () => {
        if (!categoryFilter) {
            const result = await reportClient.listReports();
            setReports(result?.reports!);
        } else {
            const result = await reportClient.listReportsByCategory(categoryFilter);
            setReports(result?.reports!);
        }
    }, [reportClient, setReports, categoryFilter]);

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

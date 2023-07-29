import { IReport } from '@/models';
import { isUndefined, useEffectAsync } from '@/utils';
import { useCallback, useState } from 'react';
import { useReportClient } from './useReportClient';
import { GridFilterItem } from '@mui/x-data-grid';
<<<<<<< HEAD
import { ReportFields } from '@/models';
=======
>>>>>>> 64a275d (Dump all files from min-sortAndFilter)

export type UseReportsResult = {
    /** List of reports */
    /** NOTE: reports should NOT be undefined.
     * I'm feeding the reports to MUI Datagrid directly and it does not take undefined values, empty array is good*/
    reports: IReport[];
    /** Whether list is loading */
    isLoading: boolean;
    /** Load messages with filtering or sorting based on any catergory */
    loadReports: () => void;
    /** Refresh messages to update the list with filter or sort applied */
    refreshReports: () => void;
};

// TODO: add sort and filter category in the parameter of useReports()
<<<<<<< HEAD
export const useReports = (queryOptions: GridFilterItem[]): UseReportsResult => {
    const reportClient = useReportClient();

    const [reports, setReports] = useState<IReport[]>([]);
    const isLoading = reports.length === 0;
=======
export const useReports = (queryOptions?: GridFilterItem[]): UseReportsResult => {
    const reportClient = useReportClient();

    const [reports, setReports] = useState<IReport[] | undefined>(undefined);
    const isLoading = isUndefined(reports);
>>>>>>> 64a275d (Dump all files from min-sortAndFilter)

    // TODO: add sort and filter category here
    const loadReports = useCallback(async () => {
        if (queryOptions?.length !== 0) {
            // field: the report field that was applied a filter; value: the filter value
            const { field, value } = queryOptions![0];
            console.log(field, value);
<<<<<<< HEAD

            if (field === ReportFields.Status_Of_Report && value) {
                const result = await reportClient.listReportsByStatus(value);
                setReports(result?.reports || []);
            }
        } else {
            const result = await reportClient.listReports();
            setReports(result?.reports || []);
=======
            //TODO: use enum here for reportField
            if (field === 'statusOfReport' && value) {
                const result = await reportClient.listReportsByStatus(value);
                setReports(result?.reports!);
                // console.log(result)
            }
        } else {
            const result = await reportClient.listReports();
            setReports(result?.reports!);
>>>>>>> 64a275d (Dump all files from min-sortAndFilter)
        }
    }, [reportClient, setReports, queryOptions]);

    const refreshReports = useCallback(async () => {
        setReports([]);
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

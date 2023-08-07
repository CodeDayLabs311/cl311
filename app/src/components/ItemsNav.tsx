import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ItemsHeader, BoldText } from '@/styles/StyleHomePage';

export default function ItemsNav() {
    const [value, setValue] = React.useState('dashboard');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <ItemsHeader>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="primary tabs example"
            >
                <Tab value="dashboard" label={<BoldText>Dashboard</BoldText>} href="/dashboard" />
                <Tab
                    value="add-report"
                    label={<BoldText>Add Report</BoldText>}
                    href="/report/create"
                />
                <Tab value="report-list" label={<BoldText>Report List</BoldText>} href="/report" />
                <Tab
                    value="add-guestbook"
                    label={<BoldText>Add Guestbook</BoldText>}
                    href="/guestbook/create"
                />
                <Tab
                    value="guestbook-list"
                    label={<BoldText>Guestbook List</BoldText>}
                    href="/guestbook"
                />
            </Tabs>
        </ItemsHeader>
    );
}

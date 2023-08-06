import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ItemsHeader, BoldText } from '@/styles/StyleHomePage';

export default function ItemsNav() {
    const [value, setValue] = React.useState('one');

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
                <Tab value="one" label={<BoldText>Dashboard</BoldText>} href="/dashboard" />
                <Tab value="two" label={<BoldText>Add Report</BoldText>} href="/report/create" />
                <Tab value="three" label={<BoldText>Report List</BoldText>} href="/report" />
                <Tab
                    value="four"
                    label={<BoldText>Add Guestbook</BoldText>}
                    href="/guestbook/create"
                />
                <Tab value="five" label={<BoldText>Guestbook List</BoldText>} href="/guestbook" />
            </Tabs>
        </ItemsHeader>
    );
}

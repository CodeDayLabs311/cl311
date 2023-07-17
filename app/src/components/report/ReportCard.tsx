import { IReport } from '@/models';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import ButtonLink from '../ButtonLink';

export type ReportCardProps = {
    report: IReport;
};

/** Report card */
export default function ReportCard({ report }: ReportCardProps) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Report for {report.reportCategory}</Card.Title>
                <Card.Text>{report.issueDescription}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={3} className="">
                    <p className="font-monospace me-auto my-auto">ID: {report.reportId}</p>
                    <div className="vr"></div>
                    <ButtonLink variant="secondary" href={`/report/${report.reportId}/edit`}>
                        Edit
                    </ButtonLink>
                    <ButtonLink variant="primary" href={`/report/${report.reportId}`}>
                        View
                    </ButtonLink>
                </Stack>
            </Card.Footer>
        </Card>
    );
}

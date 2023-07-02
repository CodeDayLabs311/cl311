import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export type FilterByAuthorProps = {
    authorFilter: string;
    setAuthorFilter: (newAuthorFilter: string) => void;
    onSubmitFilter: () => void;
};

/** Guest book message card */
export default function FilterByAuthor({
    authorFilter,
    setAuthorFilter,
    onSubmitFilter,
}: FilterByAuthorProps) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
                type="text"
                placeholder="Filter by author..."
                value={authorFilter}
                onChange={(event) => setAuthorFilter(event.target.value)}
            />
            <Button variant="outline-primary" onClick={onSubmitFilter}>
                Filter
            </Button>
        </InputGroup>
    );
}

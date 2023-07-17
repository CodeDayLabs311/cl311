import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export type FilterByCategoryProps = {
    categoryFilter: string;
    setCategoryFilter: (newCategoryFilter: string) => void;
    onSubmitFilter: () => void;
};

/** Component to filter reports by category */
export default function FilterByCategory({
    categoryFilter,
    setCategoryFilter,
    onSubmitFilter,
}: FilterByCategoryProps) {
    return (
        <InputGroup className="mb-3">
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
                type="text"
                placeholder="Filter by category..."
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
            />
            <Button variant="outline-primary" onClick={onSubmitFilter}>
                Filter
            </Button>
        </InputGroup>
    );
}

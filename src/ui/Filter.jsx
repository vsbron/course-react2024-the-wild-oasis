import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "active" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  // Getting the reference and setter for URL state
  const [searchParams, setSearchParams] = useSearchParams();

  // Getting the currently active filter value
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  // Click handler that updates the URL with the value
  function handleClick(value) {
    // Adding the filter data to the searchParams
    searchParams.set(filterField, value);

    // Resetting the page to 1 after a filter is applied
    if (searchParams.get("page")) searchParams.set("page", 1);

    // Updating the URL
    setSearchParams(searchParams);
  }

  // Returned JSX
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={currentFilter === option.value ? "active" : "non-active"}
          disabled={currentFilter === option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

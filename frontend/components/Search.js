import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useTranslation } from "../lib/getTranslation";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

export default function Search({ query, placeholder, user, redirectPath }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [findItems, { loading, data, error }] = useLazyQuery(query, {
    fetchPolicy: "no-cache",
  });
  const items = data?.searchTerms || [];
  const findItemsButChill = debounce(findItems, 350);
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange({ inputValue }) {
      variables.searchTerm = inputValue;
      findItemsButChill({ variables });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `${redirectPath}/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });
  const variables = {
    searchTerm: inputValue,
  };
  if (user) {
    variables.user = user.id;
  }
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "text",
            placeholder,
            id: "search",
            className: loading ? "loading" : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              {...getItemProps({ item, index })}
              key={item.id}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photos[0].image.publicUrlTransformed}
                alt={item.name}
                key={`img-${item.id}`}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>
            {t.sorry}, {t.noItemsfoundFor.toLowerCase()} &quot;{inputValue}
            &quot;
          </DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}

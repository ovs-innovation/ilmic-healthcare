import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";

import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CategoryTable = ({
  data,
  lang,
  isCheck,
  categories,
  setIsCheck,
  useParamId,
  variant = "parent",
  parentNameMap = {},
  handleUpdate: handleUpdateProp,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate: handleUpdateLocal } =
    useToggleDrawer();
  const { showingTranslateValue } = useUtilsFunction();
  const handleUpdate = handleUpdateProp || handleUpdateLocal;

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const isSubVariant = variant === "sub";

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category._id}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="category"
                id={category._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(category._id)}
              />
            </TableCell>

            <TableCell className="font-semibold uppercase text-xs">
              {category?._id?.substring(20, 24)}
            </TableCell>
            <TableCell>
              {category?.icon ? (
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={category?.icon}
                  alt={category?.parent}
                />
              ) : (
                <Avatar
                  src="/no-result.svg"
                  alt="product"
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                />
              )}
            </TableCell>

            <TableCell className="font-medium text-sm">
              <span className="inline-flex items-center gap-2">
                {showingTranslateValue(category?.name)}
                {isSubVariant ? (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-green-700">
                    Sub
                  </span>
                ) : (
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-blue-700">
                    Parent
                  </span>
                )}
              </span>
            </TableCell>

            {isSubVariant ? (
              <TableCell className="text-sm text-gray-600">
                {parentNameMap[category.parentId] ||
                  category.parentName ||
                  "—"}
              </TableCell>
            ) : null}

            <TableCell className="text-sm">
              {showingTranslateValue(category?.description)}
            </TableCell>

            <TableCell className="text-center">
              <ShowHideButton
                id={category._id}
                category
                status={category.status}
              />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={category?._id}
                parent={category}
                isCheck={isCheck}
                children={isSubVariant ? [] : category?.children}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(category?.name)}
                viewPath={
                  !isSubVariant && category?.children?.length > 0
                    ? `/sub-categories?parent=${category._id}`
                    : undefined
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;

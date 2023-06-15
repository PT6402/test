import styles from "./index.module.scss";
import Card from "../../../components/Card";
import Collections from "../";
import { useCollection } from "../../../Hooks/useCollection";
import { useEffect, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";

import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";

const LayoutCollection = () => {
  const navigate = useNavigate();
  const { id: urlId } = useParams();
  const { sub: urlSub } = useParams();

  const {
    getCollection,
    getSub,
    getColor,
    getMaterial,
    getSize,
    getTypeShoes,
  } = useCollection();

  const [products, setProducts] = useState(null);
  const [collection, setCollection] = useState(null);
  const [sub, setSub] = useState([]);
  const [color, setColor] = useState([]);
  const [dataColor, setDataColor] = useState({});
  const [material, setMaterial] = useState([]);
  const [size, setSize] = useState([]);
  const [typeShoes, setTypeShoes] = useState([]);
  console.log(getSub());
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getCollection();
      if (fetchedProducts) {
        const filteredData = [];
        const ids = [];
        for (let i = 0; i < fetchedProducts.length; i++) {
          if (!ids.includes(fetchedProducts[i].id)) {
            filteredData.push(fetchedProducts[i]);
            ids.push(fetchedProducts[i].id);
          }
        }
        if (filteredData.length > 0) setProducts(filteredData);
      }
    };
    console.log(products);
    fetchProducts();
    setColor(getColor);
    setSub(getSub);
    setMaterial(getMaterial);
    setSize(getSize);
    setTypeShoes(getTypeShoes);
    // fetchSub()
  }, [urlId, urlSub]);

  useEffect(() => {
    if (products) {
      // switch (urlId,urlSub){

      //   case "product":

      // }

      let selectedProducts;
      if (urlId === "product") {
        selectedProducts = products;
      } else if (urlId === "men" || urlId === "women") {
        if (urlSub) {
          selectedProducts = products.filter(
            (product) => product.collection === urlId && product.type === urlSub
          );
        } else {
          selectedProducts = products.filter(
            (product) => product.collection === urlId
          );
        }
      } else {
        // selectedProducts = null;
        selectedProducts = products;
      }
      console.log(selectedProducts);

      if (selectedProducts) {
        setCollection(selectedProducts);
        console.log(selectedProducts);
      } else {
        navigate("/");
      }
    }
  }, [navigate, products, urlId, urlSub]);

  

 
  //
  const filters = [
    {
      id: "color",
      name: "Color",
      options: color ? [...color] : setColor(getColor()),
    },
    {
      id: "material",
      name: "Material",
      options: material ? [...material] : setMaterial(getMaterial()),
    },
    {
      id: "size",
      name: "Size",
      options: size ? [...size] : setSize(getSize()),
    },
    {
      id: "type_shoes",
      name: "Type Shoes",
      options: typeShoes ? [...typeShoes] : setTypeShoes(getTypeShoes()),
    },
  ];
  let content = (
    <>
      <div className={styles.content_wrapper}>
        <aside className={styles.sidebar}>
          <Card className={styles.card}>
            <form className="hidden lg:block m-5 ">
              <Card className={styles.checkout_wrapper}>
                <div
                  className={styles.total}
               
                >
                  All {urlId}
                </div>
              </Card>
              <h3 className="sr-only">Categories</h3>
              <ul
                role="list"
                className="space-y-4 border-b border-gray-200 pb-6 text-2xl font-medium text-gray-900 "
              >
                {sub.length > 0 &&
                  sub.map((category, index) => {
                    const name = category.name;
                    return (
                      <li key={index}>
                        <span
                          // onClick={() => handleFilterSub(name)}
                          className="cursor-pointer"
                        >
                          {name}
                        </span>
                      </li>
                    );
                  })}
              </ul>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6 "
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-3xl  text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options &&
                            section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  // onChange={filterHandler}
                                  // ref={dataInput}
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-2xl text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Card>
        </aside>
        <div className={styles.list_wrapper}>
          <Collections collection={collection}></Collections>
        </div>
      </div>
    </>
  );

  return (
    <>
      <section>
        <div className={`${styles.container} main-container`}>
          {/* <h1 className={styles.title}>Your cart</h1> */}
          {content}
        </div>
      </section>
    </>
  );
};

export default LayoutCollection;

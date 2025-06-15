import React, { useEffect, useState } from "react";
import { useQuery } from "urql";
import PropTypes from "prop-types";
import { Card } from "@components/admin/cms/Card";
import Spinner from "@components/common/Spinner";

const MAIN_CATEGORIES = [
  "toys",
  "footwear",
  "clothing",
  "formal-wear",
  "babies",
  "furniture",
];

const CategoriesQuery = `
  query {
    categories(filters: [{ key: "parent", operation: eq, value: null }]) {
      items { categoryId uuid name urlKey }
    }
  }
`;

const ProductsQuery = `
  query($id: Int) {
    category(id: $id) {
      categoryId
      uuid
      products(filters: [{key: "limit", operation: eq, value: "2000"}, {key:"ob", operation:eq, value:"sort_order"}]) {
        items {
          productId
          uuid
          name
          price { regular { text } }
          image { url: thumb }
        }
      }
      children {
        categoryId
        uuid
        products(filters: [{key: "limit", operation: eq, value: "2000"}, {key:"ob", operation:eq, value:"sort_order"}]) {
          items {
            productId
            uuid
            name
            price { regular { text } }
            image { url: thumb }
          }
        }
        children {
          categoryId
          uuid
          products(filters: [{key: "limit", operation: eq, value: "2000"}, {key:"ob", operation:eq, value:"sort_order"}]) {
            items {
              productId
              uuid
              name
              price { regular { text } }
              image { url: thumb }
            }
          }
        }
      }
    }
  }
`;

export default function SortOrderList() {
  const [selected, setSelected] = useState(null);
  const [categoryUuid, setCategoryUuid] = useState(null);
  const [order, setOrder] = useState([]);

  const [catResult] = useQuery({ query: CategoriesQuery });
  const [prodResult, reExec] = useQuery({
    query: ProductsQuery,
    variables: { id: selected },
    pause: !selected,
  });

  useEffect(() => {
    if (prodResult.data) {
      setCategoryUuid(prodResult.data.category.uuid);
      const collect = (cat) => {
        let items = cat.products?.items || [];
        if (cat.children) {
          cat.children.forEach((child) => {
            items = items.concat(collect(child));
          });
        }
        return items;
      };
      setOrder(collect(prodResult.data.category));
    }
  }, [prodResult.data]);

  const onDragStart = (index) => {
    setOrder((o) => o.map((p, i) => ({ ...p, dragging: i === index })));
  };

  const onDrop = (index) => {
    setOrder((o) => {
      const dragIndex = o.findIndex((p) => p.dragging);
      if (dragIndex === -1) return o;
      const newItems = [...o];
      const [moved] = newItems.splice(dragIndex, 1);
      moved.dragging = false;
      newItems.splice(index, 0, moved);
      return newItems;
    });
  };

  const saveOrder = async () => {
    if (!selected || !categoryUuid) return;
    await fetch(`/api/sort-order/${categoryUuid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: order.map((p) => p.uuid) }),
      credentials: "same-origin",
    });
    reExec({ requestPolicy: "network-only" });
  };

  if (catResult.fetching) {
    return (
      <div className="p-3 border border-divider rounded flex justify-center items-center">
        <Spinner width={25} height={25} />
      </div>
    );
  }

  const categories = (catResult.data?.categories.items || [])
    .filter((c) => MAIN_CATEGORIES.includes(c.urlKey))
    .sort(
      (a, b) =>
        MAIN_CATEGORIES.indexOf(a.urlKey) - MAIN_CATEGORIES.indexOf(b.urlKey)
    );

  return (
    <Card
      title="Sort Order"
      actions={selected ? [{ name: "Save", onAction: saveOrder }] : []}
    >
      <Card.Session>
        <div className="mb-4">
          <select
            className="form-control"
            onChange={(e) => setSelected(parseInt(e.target.value, 10))}
            value={selected || ""}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        {prodResult.fetching && (
          <div className="p-3 border border-divider rounded flex justify-center items-center">
            <Spinner width={25} height={25} />
          </div>
        )}
        {!prodResult.fetching && order.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {order.map((p, idx) => (
              <div
                key={p.uuid}
                draggable
                onDragStart={() => onDragStart(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(idx)}
                className="border border-divider p-2 rounded text-center"
              >
                {p.image?.url && (
                  <img src={p.image.url} alt="" className="mb-2" />
                )}
                <div>{p.name}</div>
                <div>{p.price.regular.text}</div>
              </div>
            ))}
          </div>
        )}
      </Card.Session>
    </Card>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 10,
};

export const query = CategoriesQuery;

export const variables = null;

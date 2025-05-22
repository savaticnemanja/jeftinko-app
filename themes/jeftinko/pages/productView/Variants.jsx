/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React from 'react';
import PubSub from 'pubsub-js';
import { FORM_VALIDATED } from '@evershop/evershop/src/lib/util/events';
import './Variants.scss';
import { useAppDispatch } from '@components/common/context/app';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

const colorMap = {
  "Braon": "#8B4513",
  "Maslinasta": "#808000",
  "Krem": "#FFFDD0",
  "Plava": "#0000FF",
  "Teget": "#001F5B",
  "Zelena": "#008000",
  "Crvena": "#FF0000",
  "Narandžasta": "#FFA500",
  "Žuta": "#FFFF00",
  "Bordo": "#800000",
  "Ljubičasta": "#800080",
  "Roze": "#FFC0CB",
  "Zlatna": "#FFD700",
  "Srebrna": "#C0C0C0",
  "Crna": "#000000",
  "Bela": "#FFFFFF",
  "Siva": "#808080",
  "Bež": "#F5F5DC"
};


// Chevron Icon
const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const processAttributes = (vs, attributes, currentUrl) => {
  const selectedOptions = [];
  let newAttributes;
  newAttributes = attributes.map((attribute) => {
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search).entries();
    const check = Array.from(params).find(
      ([key, value]) =>
        key === attribute.attributeCode &&
        attribute.options.find(
          (option) => parseInt(option.optionId, 10) === parseInt(value, 10)
        )
    );
    if (check) {
      const terms = [
        ...selectedOptions,
        { attributeCode: check[0], optionId: parseInt(check[1], 10) }
      ];
      const variant = vs.items.find((item) =>
        terms.every((attr) =>
          item.attributes.find(
            (term) =>
              term.attributeCode === attr.attributeCode &&
              parseInt(term.optionId, 10) === parseInt(attr.optionId, 10)
          )
        )
      );
      if (variant) {
        selectedOptions.push({
          attributeCode: check[0],
          optionId: parseInt(check[1], 10)
        });
        return {
          ...attribute,
          selected: true,
          selectedOption: parseInt(check[1], 10)
        };
      } else {
        return { ...attribute, selected: false, selectedOption: null };
      }
    } else {
      return { ...attribute, selected: false, selectedOption: null };
    }
  });

  newAttributes = newAttributes.map((attribute) => {
    const options = attribute.options.map((option) => {
      const terms = selectedOptions
        .filter(
          (selected) => selected.attributeCode !== attribute.attributeCode
        )
        .concat({
          attributeCode: attribute.attributeCode,
          optionId: option.optionId
        });
      const variant = vs.items.find((item) =>
        terms.every((attr) =>
          item.attributes.find(
            (term) =>
              term.attributeCode === attr.attributeCode &&
              parseInt(term.optionId, 10) === parseInt(attr.optionId, 10)
          )
        )
      );
      if (variant) {
        return { ...option, available: true };
      } else {
        return { ...option, available: false };
      }
    });
    return { ...attribute, options };
  });
  return newAttributes;
};

export default function Variants({
  product: { variantGroup: vs },
  pageInfo: { url: currentProductUrl }
}) {
  const AppContextDispatch = useAppDispatch();
  const [attributes, setAttributes] = React.useState(() =>
    !vs ? [] : processAttributes(vs, vs.variantAttributes, currentProductUrl)
  );
  const [error, setError] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const attributeRef = React.useRef(
    !vs ? [] : processAttributes(vs, vs.variantAttributes, currentProductUrl)
  );
  const [currentLocationpath, setCurrentLocationpath] = React.useState('');

  const validate = (formId, errors) => {
    if (formId !== 'productForm') return true;
    if (attributeRef.current.find((a) => a.selected !== true)) {
      errors.variants = 'Missing variant';
      setError(_('Please select variant options'));
      return false;
    } else {
      delete errors.variants;
      setError(null);
      return true;
    }
  };

  React.useEffect(() => {

    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const firstSegment = currentPath.split('/')[1];
      setCurrentLocationpath(firstSegment);
    }


    const token = PubSub.subscribe(FORM_VALIDATED, (message, data) => {
      validate(data.formId, data.errors);
    });

    window.addEventListener('popstate', () => {
      const newAttributes = processAttributes(
        vs,
        vs.variantAttributes,
        window.location.href
      );
      setAttributes(() => newAttributes);
      attributeRef.current = newAttributes;
    });

    return function cleanup() {
      PubSub.unsubscribe(token);
      window.removeEventListener('popstate', () => {});
    };
    
  }, []);

  const onClick = async (attributeCode, optionId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('ajax', true);
    url.searchParams.set(attributeCode, optionId);
    await AppContextDispatch.fetchPageData(url);
    url.searchParams.delete('ajax');
    history.pushState(null, '', url);
    const popStateEvent = new PopStateEvent('popstate');
    dispatchEvent(popStateEvent);
  };

  const Modal = ({ onClose }) => (
    <div
      onClick={onClose}
      className="mt-4 overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white"
    >
      <div onClick={(e) => e.stopPropagation()}>
        {currentLocationpath === "footwear" ? (
          <table className="size-guide-table min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Dužina stopala (cm)</th>
                <th className="px-4 py-2">Veličina (EU)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["12,3", "20"], ["13", "21"], ["13,7", "22"], ["14,3", "23"],
                ["14,9", "24"], ["15,5", "25"], ["16,2", "26"], ["16,8", "27"],
                ["17,4", "28"], ["18,1", "29"], ["18,7", "30"], ["19,4", "31"],
                ["20,1", "32"], ["20,7", "33"], ["21,4", "34"], ["22", "35"]
              ].map(([length, size], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{length}</td>
                  <td className="px-4 py-2">{size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="size-guide-table min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Visina deteta (cm)</th>
                <th className="px-4 py-2">Meseci</th>
                <th className="px-4 py-2">Godina</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["62", "3", ""], ["68", "6", ""], ["74", "9", ""], ["80", "12", "1"],
                ["86", "18", "1,5"], ["92", "24", "2"], ["98", "", "3"], ["104", "", "4"],
                ["110", "", "5"], ["116", "", "6"], ["122", "", "7"], ["128", "", "8"],
                ["134", "", "9"], ["140", "", "10"], ["148", "", "11"], ["152", "", "12"]
              ].map(([height, months, years], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-2">{height}</td>
                  <td className="px-4 py-2">{months}</td>
                  <td className="px-4 py-2">{years}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  return (
<div className="variant variant-container grid grid-cols-1 gap-4 mt-8">
  {attributes.map((attribute, i) => {
    const {
      attributeCode,
      attributeId,
      attribute_name,
      selectedOption,
      selected,
      options: rawOptions
    } = attribute;

    const options = rawOptions.filter(
      (option, index, self) =>
        self.findIndex(o => o.optionId === option.optionId) === index && option.productId
    );

    const isSizeAttribute = attributeCode.toLowerCase().includes('size');
    const label = isSizeAttribute ? 'Veličina:' : 'Boja:';

    return (
      <div key={attributeCode}>
        <input name={`variant_options[${i}][attribute_id]`} type="hidden" value={attributeId || ''} />
        <input name={`variant_options[${i}][optionId]`} type="hidden" value={selectedOption || ''} />

        <p className="font-bold text-[18px] text-[#0150A0] mb-4">{label}</p>

        <div className="mb-2 text-textSubdued uppercase">
          <span>{attribute_name}</span>
        </div>

        <ul className="variant-option-list flex justify-start gap-4 flex-wrap">
          {options.map((option) => {
            const { optionId, optionText, available } = option;

            const isSelected = selected && selectedOption === optionId;
            const isUnavailable = available === false;

            const shadowColor = isSizeAttribute
              ? "#D1D5DB" // neutral gray for size
              : colorMap[optionText.trim()] || "#000000";

            const classes = [
              "inline-block px-6 py-2 font-bold text-[#012D73] text-center rounded-sm bg-white",
              "transform transition-all duration-150",
              "hover:translate-x-[2px] hover:translate-y-[2px]",
              isSelected ? "ring-2 ring-offset-2" : "",
              isUnavailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            ].join(" ");

            const boxShadowStyle = {
              boxShadow: isSelected
                ? isSizeAttribute
                  ? `inset 0 0 0 3px ${shadowColor}`
                  : `4px 4px 0 ${shadowColor}, inset 0 0 0 2px ${shadowColor}`
                : isSizeAttribute
                ? `2px 2px 0 ${shadowColor}`
                : `4px 4px 0 ${shadowColor}`
            };

            const handleClick = async (e) => {
              e.preventDefault();
              if (!available) return;
              await onClick(attributeCode, optionId);
            };

            return (
              <li key={optionId}>
                <a
                  href="#"
                  className={classes}
                  style={boxShadowStyle}
                  onClick={handleClick}
                >
                  {optionText}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  })}

    {["men", "formal-wear", "babies", "clothing"].includes(currentLocationpath) && (
      <div className="mt-4">
        <button
          type="button"
          className="text-[#fff] bg-[#0150A0] px-6 py-4 rounded-[4px] inline-flex items-center"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Vodič veličina
          <ChevronIcon isOpen={isModalOpen} />
        </button>
      </div>
      )}
      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)}>
          <Modal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      {error && <div className="variant-validate error text-critical">{error}</div>}
    </div>
  );
}

Variants.propTypes = {
  product: PropTypes.shape({
    variantGroup: PropTypes.shape({
      variantAttributes: PropTypes.arrayOf(
        PropTypes.shape({
          attributeId: PropTypes.number,
          attributeCode: PropTypes.string,
          attributeName: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              optionId: PropTypes.number,
              optionText: PropTypes.string,
              productId: PropTypes.number
            })
          )
        })
      ),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          attributes: PropTypes.arrayOf(
            PropTypes.shape({
              attributeCode: PropTypes.string,
              optionId: PropTypes.number
            })
          )
        })
      )
    })
  }).isRequired,
  pageInfo: PropTypes.shape({
    url: PropTypes.string
  }).isRequired
};

export const layout = {
  areaId: 'productPageMiddleRight',
  sortOrder: 35
};

export const query = `
query Query {
  pageInfo {
    url
  }
  product(id: getContextValue('productId')) {
    variantGroup {
      variantAttributes {
        attributeId
        attributeCode
        attributeName
        options {
          optionId
          optionText
          productId
        }
      }
      items {
        attributes {
          attributeCode
          optionId
        }
      }
    }
  }
}
`;

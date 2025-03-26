import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import Area from '@components/common/Area';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function Layout({ logoutUrl }) {
  const logout = async (e) => {
    e.preventDefault();
    const respone = await fetch(logoutUrl, {
      method: 'GET'
    });
    const data = await respone.json();
    if (data.error) {
      toast.error(data.error.message);
    } else {
      window.location.href = '/';
    }
  };
  return (
    <div>
      <h1 className="text-center">{_('My Account')}</h1>
      <div className="page-width mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="mb-8 flex justify-between items-center bg-[#9B5DE5] rounded-[8px] px-5 h-[44.5px] shadow-[5px_5px_0_0_rgba(0,0,0,0.125)]">
            <h2 className='text-[16px] font-semibold uppercase text-white'>{_('Order History')}</h2>
          </div>
          <Area id="accountPageOrderHistory" noOuter />
        </div>
        <div className="col-span-1">
          <div className="mb-8 flex justify-between items-center bg-[#00F5D4] rounded-[8px] px-5 h-[44.5px] shadow-[5px_5px_0_0_rgba(0,0,0,0.125)]">
            <h2 className='text-[16px] font-semibold uppercase text-white'>{_('Account Details')}</h2>
            <a className="text-interactive" href="#" onClick={(e) => logout(e)}>
              {_('Logout')}
            </a>
          </div>
          <Area id="accountPageInfo" noOuter />
        </div>
      </div>
      <div className="page-width mt-12">
        <div className="mb-8 flex justify-between items-center bg-[#FEE440] rounded-[8px] px-5 h-[44.5px] shadow-[5px_5px_0_0_rgba(0,0,0,0.125)]">
          <h2 className='text-[16px] font-semibold uppercase text-white'>{_('Address Book')}</h2>
        </div>
        <Area id="accountPageAddressBook" noOuter />
      </div>
    </div>
  );
}

Layout.propTypes = {
  logoutUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    logoutUrl: url(routeId: "customerLogoutJson")
  }
`;

'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { IRootState } from '@/store';
import { toggleTheme, toggleSidebar } from '@/store/themeConfigSlice';
import Dropdown from '@/components/dropdown';
import IconMenu from '@/components/icon/icon-menu';
import IconSun from '@/components/icon/icon-sun';
import IconMoon from '@/components/icon/icon-moon';
import IconLaptop from '@/components/icon/icon-laptop';
import IconLogout from '@/components/icon/icon-logout';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import SessionSelect from './session-select';

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
      const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathname]);

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
          <div className="shadow-sm">
            <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
              <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
                <Link href="/" className="main-logo flex shrink-0 items-center">
                  <Image
                    className="ml-[5px] flex-none"
                    src="/assets/images/logo-kirimy.png"
                    alt="logo"
                    width={100}
                    height={20}
                  />
                </Link>
                <button
                  type="button"
                  className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <IconMenu className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
                <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                <div>
                  <SessionSelect />
                </div>
                <div>
                  {themeConfig.theme === 'light' ? (
                    <button
                      className={`${
                        themeConfig.theme === 'light' &&
                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                      }`}
                      onClick={() => dispatch(toggleTheme('dark'))}
                    >
                      <IconSun />
                    </button>
                  ) : (
                    ''
                  )}
                  {themeConfig.theme === 'dark' && (
                    <button
                      className={`${
                        themeConfig.theme === 'dark' &&
                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                      }`}
                      onClick={() => dispatch(toggleTheme('system'))}
                    >
                      <IconMoon />
                    </button>
                  )}
                  {themeConfig.theme === 'system' && (
                    <button
                      className={`${
                        themeConfig.theme === 'system' &&
                        'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                      }`}
                      onClick={() => dispatch(toggleTheme('light'))}
                    >
                      <IconLaptop />
                    </button>
                  )}
                </div>

                <div className="dropdown flex shrink-0">
                  <Dropdown
                    offset={[0, 8]}
                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                    btnClassName="relative group block"
                    button={
                      <>
                        {session.user?.image ? (
                          <img
                            className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                            src={session.user?.image as string}
                            alt="userProfile"
                          />
                        ) : (
                          <div className="h-[36px] w-[36px] rounded-full bg-gray-100"></div>
                        )}
                      </>
                    }
                  >
                    <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                      <li>
                        <div className="flex items-center px-4 py-4">
                          {session.user?.image ? (
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={session.user?.image as string}
                              alt="userProfile"
                            />
                          ) : (
                            <div className="h-[36px] w-[36px] rounded-md bg-gray-100"></div>
                          )}
                          <div className="truncate ltr:pl-4 rtl:pr-4">
                            <h4 className="text-base">{session.user?.name}</h4>
                            <button
                              type="button"
                              className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                            >
                              {session.user?.email}
                            </button>
                          </div>
                        </div>
                      </li>
                      <li className="border-t border-white-light dark:border-white-light/10">
                        <button onClick={() => signOut()} className="!py-3 text-danger">
                          <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
};

export default Header;

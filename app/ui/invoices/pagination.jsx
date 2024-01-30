'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }) {
  // NOTE: comment in this code when you get to this point in the course
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(
    Number(currentPage),
    Number(totalPages.value),
  );

  function createPageURL(pageNumber) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === Number(page)}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage === Number(totalPages.value)}
        />
      </div>
    </>
  );
}

function PaginationNumber({ page, href, isActive, position }) {
  const className = `flex h-10 w-10 items-center justify-center text-sm border ${
    (position === 'first' || position === 'single') && 'rounded-l-md'
  } ${(position === 'last' || position === 'single') && 'rounded-r-md'} ${
    isActive && 'z-10 bg-blue-600 border-blue-600 text-white'
  } ${!isActive && position !== 'middle' && 'hover:bg-gray-100'} ${
    position === 'middle' && 'text-gray-300'
  }`;

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ href, direction, isDisabled }) {
  const className = `flex h-10 w-10 items-center justify-center rounded-md border  ${
    isDisabled && 'pointer-events-none text-gray-300'
  } ${!isDisabled && 'hover:bg-gray-100'} ${
    direction === 'left' && 'mr-2 md:mr-4'
  } ${direction === 'right' && 'ml-2 md:ml-4'}`;

  const icon =
    direction === 'left' ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}

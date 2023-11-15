// Module Imports
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ArrowDownIcon, ArrowPathIcon, ArrowUpIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import type { Column } from '@tanstack/react-table';
import { Button, Card, Divider, Flex, Subtitle } from '@tremor/react';

// Types
interface LocationColumnHeaderProps<TData, TValue> {
    children: React.ReactNode;
    column: Column<TData, TValue>;
}

export const LocationColumnHeader = <TData, TValue>({
    children,
    column,
}: LocationColumnHeaderProps<TData, TValue>) => {
    return (
        <div>
            <Menu as='div' className='relative inline-block'>
                <Menu.Button as='div'>
                    <Button
                        icon={
                            column.getIsSorted() === 'desc'
                                ? ArrowDownIcon
                                : column.getIsSorted() === 'asc'
                                ? ArrowUpIcon
                                : ChevronUpDownIcon
                        }
                        iconPosition='right'
                        size='xs'
                        variant='light'>
                        {children}
                    </Button>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right'>
                        <Card className='py-2 w-[200px]'>
                            <Flex alignItems='start' flexDirection='col' className='space-y-2'>
                                <Subtitle>Order</Subtitle>
                                <Button
                                    icon={ArrowUpIcon}
                                    onClick={() => column.toggleSorting(false)}
                                    size='xs'
                                    variant='light'>
                                    Asc
                                </Button>
                                <Button
                                    icon={ArrowDownIcon}
                                    onClick={() => column.toggleSorting(true)}
                                    size='xs'
                                    variant='light'>
                                    Desc
                                </Button>
                                <Divider />
                                <Button
                                    icon={ArrowPathIcon}
                                    onClick={() => column.clearSorting()}
                                    size='xs'
                                    variant='light'>
                                    Reset
                                </Button>
                            </Flex>
                        </Card>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

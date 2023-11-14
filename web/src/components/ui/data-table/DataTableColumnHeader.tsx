// Module Imports
import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ArrowDownIcon, ArrowUpIcon, ChevronUpDownIcon} from '@heroicons/react/24/outline';
import {Button, Card, Flex} from '@tremor/react';
import type {Column} from '@tanstack/react-table';

// Types
interface DataTableColumnHeaderProps<TData, TValue> {
    children: React.ReactNode;
    column: Column<TData, TValue>;
}

export const DataTableColumnHeader = <TData, TValue>({
    children,
    column,
}: DataTableColumnHeaderProps<TData, TValue>) => {
    return (
        <div>
            <Menu as='div' className='relative inline-block'>
                <div>
                    <Menu.Button>
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
                </div>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='absolute left-0 mt-2 w-56 origin-top-right'>
                        <Card className='max-w-fit p-4'>
                            <Flex alignItems='start' flexDirection='col' className='space-y-2'>
                                <Menu.Item>
                                    <Button
                                        icon={ArrowUpIcon}
                                        onClick={() => column.toggleSorting(false)}
                                        size='xs'
                                        variant='light'>
                                        Asc
                                    </Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button
                                        icon={ArrowDownIcon}
                                        onClick={() => column.toggleSorting(true)}
                                        size='xs'
                                        variant='light'>
                                        Desc
                                    </Button>
                                </Menu.Item>
                            </Flex>
                        </Card>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

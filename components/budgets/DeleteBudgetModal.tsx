"use client";

import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ConfirmPasswordForm from './ConfirmPasswordForm';

export default function DeleteBudgetModal() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const deleteBudgetId = searchParams.get('deleteBudgetId');

  const show = deleteBudgetId !== null && !isNaN(Number(deleteBudgetId)); // 👈 Aquí la validación robusta

  const closeModal = () => {
    const hiddenModal = new URLSearchParams(searchParams);
    hiddenModal.delete('deleteBudgetId');
    router.replace(`${pathName}?${hiddenModal}`);
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-5xl p-6 transform overflow-hidden rounded-xl bg-gray-800 text-left align-middle shadow-xl transition-all">
                <ConfirmPasswordForm />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

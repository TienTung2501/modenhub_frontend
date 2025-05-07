'use client';
import { Header } from "@/components/subnet/header"
import { Sidebar } from "@/components/subnet/sidebar"
import { TabNavigation } from "@/components/subnet/tab-navigation"
import { RegistrationTab } from "@/components/subnet/registration-tab"

export default function RegistrationPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar subnetId={params.id} />
        <div className="flex flex-1 flex-col overflow-auto">
          <TabNavigation subnetId={params.id} />
          <RegistrationTab subnetId={params.id} />
        </div>
      </div>
    </div>
  )
}

import { redirect } from "next/navigation"

export default async function SubnetPage({ params }: { params: { id: string } }) {
  redirect(`/subnets/${params.id}/metagraph`)
}

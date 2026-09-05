import type { Member } from "@/types/member";
import { MemberCard } from "./MemberCard";
import { Panel } from "@/components/ui/Panel";

interface Props {
  members: Member[]
}

export const ClubMembers = ({ members }: Props) => {
  return (
    <Panel className='mx-auto mt-10 max-w-5xl'>
      <div className='relative mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6'>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </Panel>
  )
}

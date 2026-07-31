import type { Member } from "@/types/member";
import { MemberCard } from "./MemberCard";

interface Props {
  members: Member[]
}

export const ClubMembers = ({members}: Props) => {
  return (
    <div className='grid grid-cols-4 max-w-5xl mx-auto gap-8 mt-8'>
      {members.map((member, index) => {
        return (
          <MemberCard key={index} member={member} />
        )
      })}
    </div>
  )
}

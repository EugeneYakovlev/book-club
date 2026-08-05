import type { Member } from "@/types/member";
import { MemberCard } from "./MemberCard";

interface Props {
  members: Member[]
}

export const ClubMembers = ({members}: Props) => {
  return (
    <div className='relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-4xl border border-slate-200/80 bg-linear-to-br from-violet-50 via-white to-amber-50 p-5 shadow-[0_30px_70px_-48px_rgba(49,46,129,0.55)] dark:border-white/10 dark:from-violet-950/35 dark:via-neutral-950 dark:to-amber-950/20 sm:p-8'>
      <div className='relative mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6'>
        {members.map((member) => {
          return (
            <MemberCard key={member.id} member={member} />
          )
        })}
      </div>
    </div>
  )
}

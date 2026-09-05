import Link from "next/link";
import Image from "next/image";

import type { Member } from "@/types/member";


interface Props {
  member: Member
}

export const MemberCard = ({member}: Props) => {
  return (
    <div className='group'>
      <Link href={`/members/${member.slug}`} className='flex flex-col gap-2'>
        <div className='rounded-2xl overflow-hidden perspective-distant transition-all duration-300 delay-0 lg:group-hover:shadow-2xl lg:group-hover:delay-200'>
          <div className='aspect-729/1024 transition-transform duration-1000 transform-3d relative lg:group-hover:rotate-y-180 lg:group-hover:duration-500'>
            <div className='front absolute w-full h-full backface-hidden'>
              <Image
                src='/images/card.png'
                alt={member.name}
                width={500}
                height={500}
                className='w-full h-full object-cover overflow-hidden rounded-xl'
              />
            </div>
            <div className='back absolute w-full h-full backface-hidden rotate-y-180 bg-gray-50 p-8'>
              <Image
                src={member.pic}
                alt={member.name}
                width={500}
                height={500}
                className='w-full h-full object-cover overflow-hidden rounded-xl'
              />
            </div>
          </div>
        </div>
        <div className='pt-4 text-center text-[14px] font-semibold tracking-tight'>{member.role}</div>
      </Link>
    </div>
  )
}

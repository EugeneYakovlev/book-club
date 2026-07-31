import Link from "next/link";
import Image from "next/image";

import type { Member } from "@/types/member";


interface Props {
  member: Member
}

export const MemberCard = ({member}: Props) => {
  return (
    <div className='member-card group'>
      <Link href={`/member/...`}>
        <div className='rounded-2xl overflow-hidden transition-all duration-300 delay-0 group-hover:shadow-2xl group-hover:delay-200'>
          <div className='member-card__content aspect-729/1024'>
            <div className='front'>
              <Image
                src='/images/card.png'
                alt={member.name}
                width={500}
                height={500}
                className='w-full h-full object-cover overflow-hidden rounded-xl'
              />
            </div>
            <div className='back bg-gray-50 p-8'>
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
        <div className='pt-4 text-center text-[18px]'>{member.name}</div>
      </Link>
    </div>
  )
}

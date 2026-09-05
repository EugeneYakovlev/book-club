import type { Member } from "@/types/member";

import { PillButton } from "@/components/ui/PillButton";
import { MemberMultiSelect } from './MemberMultiSelect'

interface Props {
  members: Member[]
  selectedMembers: number[]
  isHeatMapActive: boolean
  isAverageRowDisplayed: boolean
  onToggleMember: (memberId: number) => void
  onSelectAllMembers: () => void
  onToggleHeatMap: () => void
  onToggleAverageRow: () => void
}

export const BookTableControls = ({ members, selectedMembers, isHeatMapActive, isAverageRowDisplayed, onToggleMember, onSelectAllMembers, onToggleHeatMap, onToggleAverageRow }: Props) => {
  return (
    <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
      <div className='flex flex-wrap items-center gap-1.5'>
        <MemberMultiSelect
          members={members}
          selectedMembers={selectedMembers}
          onToggleMember={onToggleMember}
          onSelectAllMembers={onSelectAllMembers}
        />
      </div>
      <div className='flex items-center justify-end gap-2'>
        <PillButton isActive={isAverageRowDisplayed} aria-pressed={isAverageRowDisplayed} onClick={onToggleAverageRow}>
          Загальні оцінки
        </PillButton>
        <PillButton isActive={isHeatMapActive} aria-pressed={isHeatMapActive} onClick={onToggleHeatMap}>
          Теплова мапа
        </PillButton>
      </div>
    </div>
  );
}

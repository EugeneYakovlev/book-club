import { Member } from "@/types/member";
import { ControlButton } from "./ControlButton";
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
export const BookTableControls = ({members, selectedMembers, isHeatMapActive, isAverageRowDisplayed, onToggleMember, onSelectAllMembers, onToggleHeatMap, onToggleAverageRow}: Props) => {
  
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
        <div className="flex justify-end items-center gap-2">
          <ControlButton title='Загальні оцінки' isActive={isAverageRowDisplayed} onToggle={onToggleAverageRow} />
          <ControlButton title='Теплова мапа' isActive={isHeatMapActive} onToggle={onToggleHeatMap} />
        </div>
      </div>
  );
}

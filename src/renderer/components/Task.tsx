interface TaskProps {
  name: string;
  recurring: boolean;
  dueToday: boolean;
  recurringTiming: string | null;
  priority: 'low' | 'medium' | 'high';
}

export default function Task({
  name,
  recurring,
  dueToday,
  recurringTiming,
  priority
}: TaskProps) {
  return (
    <div className={`task-item priority-${priority}`}>
      <h3>{name}</h3>
      <div className="task-details">
        {dueToday && <span className="due-today">Due Today</span>}
        {recurring && (
          <span className="recurring">
            Recurring: {recurringTiming}
          </span>
        )}
        <span className={`priority priority-${priority}`}>
          Priority: {priority}
        </span>
      </div>
    </div>
  );
}



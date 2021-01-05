import React from "react";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

interface DatePickerProps {
  value: Date;
  isOpen: boolean;
  onDateChange: (e: Event, selectedDate?: Date | undefined) => void;
}

export default function DatePicker({
  value,
  isOpen,
  onDateChange,
}: DatePickerProps) {
  if (!isOpen) return null;

  return <DateTimePicker value={value} onChange={onDateChange} />;
}

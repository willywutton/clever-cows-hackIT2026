// A sample weekly timetable for the "Connect calendar (demo)" feature.
// It is made up: no real calendar is ever read.
//
// Each free slot is a time in the week when the sample student is free:
//   day     the weekday
//   start   when the free time begins, 24-hour "HH:MM", Singapore time
//   end     when the free time ends
//   reason  a short note shown to the student

export const freeSlots = [
  { day: "Monday", start: "19:00", end: "22:00", reason: "free after dinner" },
  { day: "Tuesday", start: "19:30", end: "22:00", reason: "free after late class" },
  { day: "Wednesday", start: "18:00", end: "21:30", reason: "no CCA this week" },
  { day: "Thursday", start: "20:00", end: "22:00", reason: "free after project meeting" },
  { day: "Friday", start: "18:00", end: "22:00", reason: "free evening" },
  { day: "Saturday", start: "09:00", end: "13:00", reason: "free before part-time shift" },
  { day: "Sunday", start: "13:00", end: "18:00", reason: "free after family lunch" },
]

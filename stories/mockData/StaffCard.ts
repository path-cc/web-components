import { Staff } from "src/types";

export const defaultStaff: Staff = {
  name: "John Doe",
  image: "https://placehold.co/150x150",
  title: "Research Software Engineer",
  institution: "University of Wisconsin—Madison",
  status: "Staff",
  organizations: ["chtc", "path"],
};

export const defaultLeader: Staff = {
  name: "John Doe",
  image: "https://placehold.co/150x150",
  title: "Principal Investigator",
  institution: "University of Wisconsin—Madison",
  status: "Staff",
  promoted: true,
  organizations: ["chtc", "path"],
};

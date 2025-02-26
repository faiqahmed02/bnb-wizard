import * as z from "zod";

const currentYear = new Date().getFullYear();

export const personalSchema = z.object({
  firstName: z.string().regex(/^[A-Za-zÄÖÜäöüß]+$/, "Invalid first name format. Only Latin and German letters allowed. Single name only."),
  lastName: z.string().regex(/^[A-Za-zÄÖÜäöüß ]+$/, "Invalid last name format. Only Latin and German letters allowed."),
  dob: z.string().refine(date => {
    const birthYear = new Date(date).getFullYear();
    const age = currentYear - birthYear;
    return age <= 79 && age >= 18;
  }, "Age must be less than 79 years and greater than 18 years"),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email format"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format. Use E.164 format."),
});

export const loanSchema = z
  .object({
    loanAmount: z.number().min(10000, "Minimum loan amount is 10,000").max(70000, "Maximum loan amount is 70,000"),
    upfrontPayment: z.number().min(0, "Upfront payment must be positive"),
    terms: z.number().min(10, "Minimum term is 10 months").max(30, "Maximum term is 30 months"),
    dob: z.string(),
  })
  .refine((data) => data.upfrontPayment < data.loanAmount, {
    message: "Upfront payment must be lower than the loan amount",
    path: ["upfrontPayment"],
  })
  .refine((data) => {
    const birthYear = new Date(data.dob).getFullYear();
    const age = currentYear - birthYear;
    return age + data.terms / 12 < 80;
  }, "Loan term exceeds allowed age limit");

export const financialSchema = z
  .object({
    monthlySalary: z.number().min(1, "Monthly salary must be at least 1"),
    additionalIncome: z.number().optional().default(0),
    mortgage: z.number().optional().default(0),
    otherCredits: z.number().optional().default(0),
    loanAmount: z.number(),
    terms: z.number(),
  })
  .refine((data) => {
    const disposableIncome = (data.monthlySalary + data.additionalIncome - data.mortgage - data.otherCredits) * data.terms * 0.5;
    return disposableIncome > data.loanAmount;
  }, {
    message: "Your financial situation does not support the requested loan amount. Reduce the loan amount or restart.",
    path: ["loanAmount"],
  });

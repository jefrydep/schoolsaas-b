interface SeedData {
    tenants: any[];
    users: any[];
    teachers: any[];
    students: any[];
    courses: any[];
    evaluations: any[];
    courseStudents: any[];
    grades: any[];
}
export declare function generateSeedData(): SeedData;
export declare const seedData: SeedData;
export {};

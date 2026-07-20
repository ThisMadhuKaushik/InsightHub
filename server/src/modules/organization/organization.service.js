import { createOrganization as createOrganizationRepository, findOrganizationByEmail,findOrganizationBySlug} from "./organization.repository.js";

import slugify from "slugify";

import { createOrganizationSchema } from "./organization.validation.js";

import AppError from "../../errors/AppError.js";

export async function createOrganization(data) {

    // Step 1
    createOrganizationSchema.parse(data);

    // Step 2
    const { name, email } = data;

    // Step 3
    const existingOrganization = await findOrganizationByEmail(email);

    if (existingOrganization) {
        throw new AppError("Organization email already exists.",409);
    }

    // Step 4
    const slug = slugify(name, {
        lower: true,
        strict: true,
    });
   const existingSlug=await findOrganizationBySlug(slug);
   if(existingSlug)
   {
    throw new AppError("Organization name already exists.",409);
   }
    // Step 5
    const organizationData = {
        ...data,
        slug,
        status: "ACTIVE",
        plan: "FREE",
   };

    // Step 6
    return await createOrganizationRepository(organizationData);
}
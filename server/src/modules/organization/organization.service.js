import { createOrganization as createOrganizationRepository, findOrganizationByEmail,findOrganizationBySlug} from "./organization.repository.js";

import slugify from "slugify";

import { createOrganizationSchema } from "./organization.validation.js";

import AppError from "../../errors/AppError.js";

export async function createOrganization(data, db) {

    createOrganizationSchema.parse(data);

    const { name, email } = data;

    const existingOrganization = await findOrganizationByEmail(email, db);

    if (existingOrganization) {
        throw new AppError(
            "Organization email already exists.",
            409
        );
    }

    const slug = slugify(name, {
        lower: true,
        strict: true,
    });

    const existingSlug = await findOrganizationBySlug(slug, db);

    if (existingSlug) {
        throw new AppError(
            "Organization name already exists.",
            409
        );
    }

    const organizationData = {
        ...data,
        slug,
        status: "ACTIVE",
        plan: "FREE",
    };

    return await createOrganizationRepository( organizationData, db);
}
import { createOrganization as createOrganizationService} from "./organization.service.js";

export async function createOrganization(req,res,next){
    try
    {
        const result = await createOrganizationService(req.body);
        res.status(201).json({
            success:true,
            data:result
        });
    }
    catch(error){
        next(error);
    }

}

import { AddressModel } from "../models/AddressModel";
import { CRUDOperations } from "./dbOperation";

export class AddressRepository extends CRUDOperations<AddressModel> {
    constructor() {
        super(AddressModel);
    }

    async createAddress(
        user_id: number,
        addressLine1: string,
        addressLine2: string,
        city: string,
        country: string,
        postCode: string

    ) {
        try {
            await this.create(
                {
                    user_id,
                    address_line1: addressLine1,
                    address_line2: addressLine2,
                    city,
                    country,
                    post_code: postCode
                }

            );
        } catch (error) {
            console.error('Error creating address:', error);
            throw new Error(`Could not create address: ${error.message}`);
        }
    }




}

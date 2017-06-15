import { IQuotationService } from './IQuotationService';
import { IQuotation } from './IQuotation';
import { IException } from '../IException';
import { ISPQuotesListResponse } from './ISPQuotesListResponse';

import { IWebPartContext } from '@microsoft/sp-webpart-base';

import pnp from 'sp-pnp-js';

export default class SPQuotationService implements IQuotationService {

    public get(context: IWebPartContext, listName: string): Promise<IQuotation[] | IException> {

        return pnp.sp.web.lists.getByTitle(listName).items.get()
        .then((listItems: ISPQuotesListResponse[]) => {

            var result: IQuotation[] = [];

            for (let q of listItems) {
                result.push ({
                    Title: q.Title,
                    Author: q.Author0
                });
            }

            return result;
        })
        .catch ((response: any) => {
            return {
                status: response.status,
                statusText: response.statusText,
                message: `Error retrieving SharePoint list ${listName}`
            };
        });
    }

}

export interface ResponseServer {
    success: boolean,
    message: string,
    statusCode: number
}

export interface PaginationResponseServer {
    hasNextPage : boolean
    hasPrevPage: boolean
    page : number
    pageSize : number
    totalItems:number
    totalPages:number
}


export type ActionResponse<T> = {
    data: T;
    error?: {
        data: {
            message: string;
        };
    };
};

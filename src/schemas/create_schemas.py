# -*- coding: UTF-8 -*-
from pydantic import EmailStr

from .base_schema import BaseModel


class ClientCreateSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str


class ServiceCreateSchema(BaseModel):
    name: str
    description: str
    price: int
    

class OrderCreateSchema(BaseModel):
    service_id: int
    client_id: int
    status: str
    order_date: str


class ReviewCreateSchema(BaseModel):
    service_id: int
    client_id: int
    review_date: str
    rating: int
    text: str

       
class PaymentCreateSchema(BaseModel):
    order_id: int
    amount: int
    payment_date: str
    payment_method: str
    
        


        


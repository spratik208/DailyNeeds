package com.app.services;

import java.util.List;

import com.app.pojo.Order;



public interface IorderServices {

	void Transaction(Order order,String email);
	boolean checkQuantity(Order order,String email);
	List<Order> getOrders(String name);

}

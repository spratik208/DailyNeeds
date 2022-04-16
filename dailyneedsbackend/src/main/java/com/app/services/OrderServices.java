package com.app.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CartDao;
import com.app.dao.OrderDao;
import com.app.dao.ProductDao;
import com.app.dao.UserDao;
import com.app.pojo.Cart;
import com.app.pojo.Order;
import com.app.pojo.Product;

@Service
@Transactional
public class OrderServices implements IorderServices {

	@Autowired
	OrderDao orderDao;
	@Autowired
	CartDao cartDao;
	
	@Autowired
	UserDao userDao;
	
	@Autowired
	ProductDao productDao;
	
	@Override
	public void Transaction(Order order,String email) {
		System.out.println("in trasaction");
		if(order.getStatus().equals("paid")) {
			System.out.println("in paid");
			List<Cart> cart=cartDao.findByUser(userDao.findByEmail(email).orElseThrow());
			for(Cart c: cart){
				System.out.println("in tras "+c);
				Product p=productDao.findById(c.getProductId()).orElseThrow();
					p.setQuantity(p.getQuantity()-c.getQuantity());
				productDao.save(p);
			}
	}
		orderDao.save(order);
	}

	@Override
	public boolean checkQuantity(Order order,String email) {
		boolean check=true;
		System.out.println(order);
		List<Cart> cart=cartDao.findByUser(userDao.findByEmail(email).orElseThrow());
		
		for(Cart c:cart){
			System.out.println(c);
			System.out.println("in for");
			Product p=productDao.findById(c.getProductId()).orElseThrow();
			System.out.println(p);
			System.out.println(p.getQuantity()-c.getQuantity());
				if((p.getQuantity()-c.getQuantity())<0) {
					check=false;	
		}
		}
		return check;
	}

	@Override
	public List<Order> getOrders(String name) {
		return orderDao.findByUser(userDao.findByEmail(name).orElseThrow());
	}

}

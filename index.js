var app = new Vue({
	el: '#app',
	data: {
		isCheckAll: false, //用于判断所有商品是否被选中
		// 所有商品的列表，表示二维数组存储商品
		list: [{
				name: '电子产品',
				isCheckType: false, //用于判断该商品种类是否被选中
				//具体某一种类商品的列表
				list: [{
						id: 1,
						name: '华为P30 Pro',
						price: 4988,
						count: 1,
						isCheck: false //用于判断该商品种类下的某一个具体商品是否被选中 
					},
					{
						id: 2,
						name: '一加7 Pro',
						price: 4499,
						count: 1,
						isCheck: false
					},
					{
						id: 3,
						name: 'Apple iPhone7',
						price: 2949,
						count: 1,
						isCheck: false
					}
				]
			},
			{
				name: '生活用品',
				isCheckType: false,
				list: [{
						id: 1,
						name: '美的冰箱',
						price: 3899,
						count: 1,
						isCheck: false
					},
					{
						id: 2,
						name: 'TCL 空调',
						price: 1799,
						count: 1,
						isCheck: false
					},
					{
						id: 3,
						name: '容声滚筒洗衣机',
						price: 3299,
						count: 1,
						isCheck: false
					}
				]
			},
			{
				name: '果蔬',
				isCheckType: false,
				list: [{
						id: 1,
						name: '芒果(箱)',
						price: 28,
						count: 1,
						isCheck: false
					},
					{
						id: 2,
						name: '车厘子(盒)',
						price: 229,
						count: 1,
						isCheck: false
					},
					{
						id: 3,
						name: '小米蕉（箱）',
						price: 30,
						count: 1,
						isCheck: false
					}
				]
			}
		]
	},
	computed: {
		totalPrice: function() { //计算商品总价
			var total = 0;
			for(types of this.list) { //types中代表商品种类
				for(goods of types.list) { //goods中代表某一商品种类下具体的一件商品
					if(goods.isCheck) {
						total += goods.price * goods.count; //总价等于商品单价*数量
					}
				}
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g, ','); //将总价转化为千分位分隔符形式
		}
	},
	methods: {
		handleReduce: function(index, subindex) { //index是商品种类数组的下标，subindex是该商品种类下某一具体商品种类的下标
			if(this.list[index].list[subindex].count === 1){
				return;
			} 
			this.list[index].list[subindex].count--;
		},
		handleAdd: function(index, subindex) {
			console.log(this.list[index]);
			if(this.list[index].list[subindex].count === 100){
				return;
			}
			this.list[index].list[subindex].count++;
		},
		handleRemove: function(index, subindex) {
			this.list[index].list.splice(subindex, 1);
			//如果该商品种类下无商品，则删除整个分类
			if(this.list[index].list.length === 0){
				this.list.splice(index,1);
			}
		},
		isSelectGoods: function(index, subindex) {
			var good = this.list[index].list[subindex];
			good.isCheck = !good.isCheck;
			//判断某一分类所有商品是否选中
			for(var i = 0; i < this.list.length; i++) {
				var type = this.list[i];
				for(var j = 0; j < type.list.length; j++) {
					if(type.list[j].isCheck == false) { //逐个判断某一商品种类下的所有具体商品是否被选中
						type.isCheckType = false;
						break; //终止循环，使整个循环不再继续
					}
					//j代表该(某一商品种类下的具体商品)数组下的一个下标,如果该种类下所有商品都被选中,则该种类商品为全选
					if(j == type.list.length - 1 && type.list[j].isCheck == true) { 
						type.isCheckType = true;
					}
				}
			}
			//判断所有商品是否选中
			for(var i = 0; i < this.list.length; i++) {
				if(this.list[i].isCheckType == false) { //判断某一商品种类是否被选中
					this.isCheckAll = false;
					break;
				}
				if(i == this.list.length - 1 && this.list[i].isCheckType == true) {
					this.isCheckAll = true;
				}
			}
		},
		//选中某一商品种类的功能
		isSelectType: function(index) {
			this.list[index].isCheckType = !this.list[index].isCheckType;
			for(goods of this.list[index].list) {
				goods.isCheck = this.list[index].isCheckType; //如果该商品种类被选中，则说明该种类下具体的某一件商品也被选中
			}
			//判断是否所有分类选中
			for(var i = 0; i < this.list.length; i++) {
				if(this.list[i].isCheckType == false) {
					this.isCheckAll = false;
					break;
				}
				if(i == this.list.length - 1 && this.list[i].isCheckType == true) {
					this.isCheckAll = true;
				}
			}
		},
		//全选功能
		isSelectAll: function() {
			this.isCheckAll = !this.isCheckAll;
			for(types of this.list) { //types代表某一商品种类
				types.isCheckType = this.isCheckAll; //如果全选按钮被选中，则说明所有种类商品被选中
				for(goods of types.list) { //goods表示某一商品种类下的具体商品
					goods.isCheck = this.isCheckAll; //如果全选按钮被选中，则说明种类下的某一具体商品也被选中
				}
			}
		}
	}
});
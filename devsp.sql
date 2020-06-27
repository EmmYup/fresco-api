{
	"info": {
		"_postman_id": "440a397b-20dc-42bd-8c7d-5e92c9628d64",
		"name": "frescoservice",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "order",
			"item": [
				{
					"name": "create",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOm51bGwsInV1aWQiOiI1NDEyMzY1NDMyMiIsImlhdCI6MTU5MTk4NTIzNiwiZXhwIjozMzExODAyNzYzNn0.lswpR23HrTNBM6Z2YQOwcHyLPPC_EfWSOcaUfcwwv0U",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"amount\": 1,\r\n    \"productId\":1\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{base}}/order",
							"host": [
								"{{base}}"
							],
							"path": [
								"order"
							]
						}
					},
					"response": []
				},
				{
					"name": "addProduct",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"amount\": 1,\r\n    \"productId\":1\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{base}}/order/9",
							"host": [
								"{{base}}"
							],
							"path": [
								"order",
								"9"
							]
						}
					},
					"response": []
				},
				{
					"name": "deleteProduct",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "{{base}}/order/1",
							"host": [
								"{{base}}"
							],
							"path": [
								"order",
								"1"
							]
						}
					},
					"response": []
				},
				{
					"name": "confirm",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base}}/order/confirm",
							"host": [
								"{{base}}"
							],
							"path": [
								"order",
								"confirm"
							]
						}
					},
					"response": []
				},
				{
					"name": "deliver",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base}}/order/9",
							"host": [
								"{{base}}"
							],
							"path": [
								"order",
								"9"
							]
						}
					},
					"response": []
				}
			],
			"protocolProfileBehavior": {}
		},
		{
			"name": "signin",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"uuid\":\"54123654322\"\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "{{base}}/auth/signin",
					"host": [
						"{{base}}"
					],
					"path": [
						"auth",
						"signin"
					]
				}
			},
			"response": []
		},
		{
			"name": "products",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "{{base}}/product",
					"host": [
						"{{base}}"
					],
					"path": [
						"product"
					]
				}
			},
			"response": []
		},
		{
			"name": "comments",
			"request": {
				"method": "POST",
				"header": [],
				"url": {
					"raw": "{{base}}/comments",
					"host": [
						"{{base}}"
					],
					"path": [
						"comments"
					]
				}
			},
			"response": []
		}
	],
	"auth": {
		"type": "bearer",
		"bearer": [
			{
				"key": "token",
				"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImVtYWlsIjoic3Vuc2V0QHN1bnNldC5jb20iLCJ1c2VybmFtZSI6InN1bnNldCIsImlhdCI6MTU4OTIxNjc4MiwiZXhwIjoxNTg5MjIwMzgyfQ.GEqFlA1a87FBAn-Kr6viwLcvQSoT6RuzWNPacKS0rc0",
				"type": "string"
			}
		]
	},
	"protocolProfileBehavior": {}
}
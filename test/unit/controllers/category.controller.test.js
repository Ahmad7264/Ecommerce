const CategoryController = require('../../../controllers/category.controller');
const Model = require('../../../models');
const CategoryModel = Model.category;
const newCategory = require ('../../mock-data/new-category.json');
const { mockRequest, mockResponse } = require('../interceptor');


let req, res;

beforeEach(() =>  {
    req = mockRequest();
    res = mockResponse();

})

describe(' CategoryController.create', () => {

    beforeEach(() => {
        req.body = newCategory;
    })
    test('should call CategoryController.create and create a new category', async () => {

        const spy =jest.spyOn(CategoryModel, 'create')
        .mockImplementation((newCategory) => Promise.resolve(newCategory));
        
        await CategoryController.create(req, res);


        expect(spy).toHaveBeenCalled();
        expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    })
    // test('should call CategoryController.create and ends with an error', () => {

    // })
});


describe('CategoryController.findAll', () => {
    test('should call CategoryController.findAll with a query value', async () => {
        const queryParam = {
            where: {
                name: "Electronics"
            }
        };

        const spy = jest.spyOn(CategoryModel, 'findAll').mockImplementation((queryParam) => Promise.resolve(newCategory));
    
    req.query = {
        name: "Electronics"
    }

    await CategoryController.findAll(req, res);

    expect(spy).toHaveBeenCalled();
    expect(CategoryModel.findAll).toHaveBeenCalledWith(queryParam);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(newCategory);
    
    
    })

});
﻿namespace Core.Entities.OrderAggregate;

public class ProductItemOrdered
{
    public Guid ProductItemId { get; set; }
    public string ProductName { get; set; }
    public string PictureUrl { get; set; }
    public ProductItemOrdered()
    {
    }
    public ProductItemOrdered(Guid productItemId, string productName, string pictureUrl)
    {
        ProductItemId = productItemId;
        ProductName = productName;
        PictureUrl = pictureUrl;
    }
}

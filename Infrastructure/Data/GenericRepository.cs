﻿using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _storeContext;

        public GenericRepository(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<T> GetByIdAsync(string id)
        {
            return await _storeContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetByIdAsync(Guid id)
        {
            return await _storeContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _storeContext.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }
        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_storeContext.Set<T>().AsQueryable(), spec);
        }

        public void Add(T entity)
        {
            _storeContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _storeContext.Set<T>().Attach(entity);
            _storeContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _storeContext.Set<T>().Remove(entity);
        }
        public async void DeleteByIdAsync(string id)
        {
            T? entityToDelete = await _storeContext.Set<T>().FindAsync(id);
            if (entityToDelete != null)
            {
                _storeContext.Set<T>().Remove(entityToDelete);
            }
        }
        public async void DeleteByIdAsync(Guid id)
        {
            T? entityToDelete = await _storeContext.Set<T>().FindAsync(id);
            if (entityToDelete != null)
            {
                _storeContext.Set<T>().Remove(entityToDelete);
            }
        }

    }
}

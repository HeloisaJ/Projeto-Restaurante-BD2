using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pizzaria.Models
{
	public class Fornecedor
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(40)]
        public string? Nome { get; set; }

        [Required, MaxLength(19)]
        public string? EstadoOrigem { get; set; }

        // Navigation property for ingredients
        // public ICollection<Ingredientes> Ingredientes { get; set; }
    }
}

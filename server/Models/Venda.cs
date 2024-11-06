using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pizzaria.Models
{
	public class Venda
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int IdCliente { get; set; }

        [ForeignKey("IdCliente")]
        public Cliente? Cliente { get; set; }

        [Required]
        public int IdPrato { get; set; }

        [ForeignKey("IdPrato")]
        public Prato? Prato { get; set; }

        [Required]
        public int Quantidade { get; set; }

        [Required]
        public DateTime Dia { get; set; }

        [Required]
        public TimeSpan Hora { get; set; }

        [Required]
        public decimal Valor { get; set; }
    }
}

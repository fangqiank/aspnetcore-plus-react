using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace React_AspNetCore_server.Migrations
{
    public partial class adddate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "Posts",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1,
                column: "UpdatedAt",
                value: new DateTime(2022, 4, 25, 15, 11, 41, 509, DateTimeKind.Local).AddTicks(205));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2,
                column: "UpdatedAt",
                value: new DateTime(2022, 4, 25, 15, 11, 41, 509, DateTimeKind.Local).AddTicks(216));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3,
                column: "UpdatedAt",
                value: new DateTime(2022, 4, 25, 15, 11, 41, 509, DateTimeKind.Local).AddTicks(221));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 4,
                column: "UpdatedAt",
                value: new DateTime(2022, 4, 25, 15, 11, 41, 509, DateTimeKind.Local).AddTicks(226));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 5,
                column: "UpdatedAt",
                value: new DateTime(2022, 4, 25, 15, 11, 41, 509, DateTimeKind.Local).AddTicks(231));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 6,
                column: "UpdatedAt",
                value: new DateTime(2022, 4, 25, 15, 11, 41, 509, DateTimeKind.Local).AddTicks(235));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "Posts");
        }
    }
}

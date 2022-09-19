CREATE VIEW [dbo].[web_vdgo_client]
AS
SELECT     dbo.to_ch_klient.id_klient, dbo.to_ch_klient.FIO, dbo.to_ch_klient.telefon, dbo.to_ch_klient.id_object
FROM         dbo.to_ch_dog_tab2 INNER JOIN
                      dbo.to_ch_dog_tab ON dbo.to_ch_dog_tab2.id_dog = dbo.to_ch_dog_tab.id_dog INNER JOIN
                      dbo.to_ch_klient ON dbo.to_ch_dog_tab.id_klient = dbo.to_ch_klient.id_klient INNER JOIN
                          (SELECT     id_dog
                            FROM          dbo.to_ch_j
                            WHERE      (kod_wrk IN (521, 522))
                            GROUP BY id_dog) AS q500 ON dbo.to_ch_dog_tab.id_dog = q500.id_dog
WHERE     (dbo.to_ch_dog_tab2.opl = 1) AND (dbo.to_ch_dog_tab.status = 1 OR
                      dbo.to_ch_dog_tab.status = 2) AND (dbo.to_ch_dog_tab2.dat_k > GETDATE() - 1) AND (dbo.to_ch_dog_tab.type_dog <> 1)
GO
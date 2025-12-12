import AddTimeModal from "@/components/Medication/AddTimeModal";
import ScheduleCard from "@/components/Medication/ScheduleCard";
import {
  FREQUENCY,
  FREQUENCY_OPTIONS,
  UNIT_OPTIONS,
  WEEK_DAYS_DISPLAY,
} from "@/constants/medication";
import { medicationSchema } from "@/schema/medicationSchema";
import {
  getListDrug,
  postSingleDrug,
} from "@/services/api/medication/medication";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBoxDaysModal from "../../../../../components/Medication/CheckBoxDaysModal";
import styles from "../../../../../styles/medicationReminder/MedicationAddScreen/styles";

export default function MedicationAddScreen() {
  const [isStartDatePickerVisible, setStartDatePickerVisible] =
    useState<boolean>(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] =
    useState<boolean>(false);
  const [showWeekModal, setShowWeekModal] = useState<boolean>(false);
  const [addTimeVisible, setAddTimeVisible] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /* ********** handle get drug list ********** */
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["drugs"],
      queryFn: ({ pageParam }) => getListDrug(pageParam, ""),
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => {
        if (!lastPage || lastPage.last === true) return undefined;
        // pageNumber tiếp theo = lastPage.number + 1
        return lastPage.number + 1;
      },
    });
  /* ****************************************** */
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      drugName: "",
      unit_id: 1,
      start_date: new Date(),
      note: "",
      frequency_type: "DAILY",
      schedules: [],
      days_of_week: [],
    },
  });

  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const schedules = watch("schedules");
  const daysOfWeek = watch("days_of_week", []);

  const addMedication = useMutation({
    mutationFn: (data: any) => postSingleDrug(data),
    onSuccess: (data) => {
      console.log(data);
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: any) => {
    const payload: any = {
      ...data,
      start_date: dayjs(data.startDate).format("YYYY-MM-DD"),
      end_date: endDate ? dayjs(data.endDate).format("YYYY-MM-DD") : null,
      interval_days: data.interval_days ? data.interval_days : null,
    };
    addMedication.mutate(payload);
  };
  const handleDeleteSchedule = (index: number) => {
    const updated = schedules.filter((_, i) => i !== index);
    setValue("schedules", updated);
  };
  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Thêm lịch nhắc</Text>

          {/* ===================== TÊN THUỐC ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Tên thuốc <Text style={styles.requiredMark}>*</Text>
            </Text>
            <Controller
              control={control}
              name="drugName"
              render={({ field: { onChange, value } }) => {
                const drugPages = data?.pages ?? [];
                const drugItems = drugPages.flatMap((p: any) => p.content);

                return (
                  <View style={{ marginBottom: 8 }}>
                    {/* === INPUT VỪA SEARCH VỪA CHO NHẬP TỰ DO === */}
                    <TextInput
                      style={styles.selectBox}
                      placeholder="Nhập hoặc chọn thuốc..."
                      placeholderTextColor="#999"
                      value={value}
                      onChangeText={(text) => {
                        onChange(text); // Cho phép nhập tên tùy ý
                        setKeyword(text); // Dùng keyword để search API
                        refetch(); // Reload danh sách
                      }}
                      onFocus={() => setOpen(true)} // Mở popup khi focus input
                    />

                    {/* === MODAL LỰA CHỌN THUỐC === */}
                    <Modal visible={open} transparent animationType="fade">
                      <View style={styles.modalOverlay}>
                        <View style={styles.modalBox}>
                          {/* Search bar đồng bộ UI */}
                          <TextInput
                            placeholder="Tìm thuốc..."
                            placeholderTextColor="#8E8E8E"
                            value={keyword}
                            onChangeText={(t) => {
                              setKeyword(t);
                              onChange(t);
                              refetch();
                            }}
                            style={[styles.input, { marginBottom: 12 }]}
                          />

                          {/* List thuốc */}
                          <FlatList
                            data={drugItems}
                            keyExtractor={(item) => item.id.toString()}
                            onEndReached={() => {
                              if (hasNextPage && !isFetchingNextPage)
                                fetchNextPage();
                            }}
                            onEndReachedThreshold={0.2}
                            ListFooterComponent={
                              isFetchingNextPage ? (
                                <ActivityIndicator
                                  style={{ marginVertical: 10 }}
                                />
                              ) : null
                            }
                            renderItem={({ item }) => (
                              <Pressable
                                style={styles.modalItem}
                                onPress={() => {
                                  onChange(item.name);
                                  setOpen(false);
                                }}
                              >
                                <Text style={styles.modalItemLabel}>
                                  {item.name}
                                </Text>
                                {item.title ? (
                                  <Text style={styles.modalItemSubLabel}>
                                    {item.title}
                                  </Text>
                                ) : null}
                              </Pressable>
                            )}
                          />

                          <Pressable
                            onPress={() => setOpen(false)}
                            style={styles.modalCloseButton}
                          >
                            <Text style={styles.modalCloseText}>Đóng</Text>
                          </Pressable>
                        </View>
                      </View>
                    </Modal>

                    {errors.drugName && (
                      <Text style={styles.errorText}>
                        {errors.drugName.message}
                      </Text>
                    )}
                  </View>
                );
              }}
            />
            {errors.drugName && (
              <Text style={styles.errorText}>{errors.drugName.message}</Text>
            )}
          </View>

          {/* ===================== ĐƠN VỊ ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Đơn vị <Text style={styles.requiredMark}>*</Text>
            </Text>
            <Controller
              control={control}
              name="unit_id"
              render={({ field: { onChange, value } }) => (
                <View style={[styles.selectBox]}>
                  <Picker
                    selectedValue={value}
                    onValueChange={(val) => onChange(val)}
                    style={{ color: "#FFF" }}
                    dropdownIconColor="#FFF"
                  >
                    {UNIT_OPTIONS.map((u) => (
                      <Picker.Item label={u.label} value={u.id} key={u.id} />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.unit_id && (
              <Text style={styles.errorText}>{errors.unit_id.message}</Text>
            )}
          </View>

          {/* ===================== NGÀY BẮT ĐẦU ===================== */}
          <Pressable
            onPress={() => setStartDatePickerVisible(true)}
            style={styles.inputContainer}
          >
            <Text style={styles.label}>
              Ngày bắt đầu uống <Text style={styles.requiredMark}>*</Text>
            </Text>

            <Text style={[styles.input, { lineHeight: 50 }]}>
              {startDate.toLocaleDateString()}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setEndDatePickerVisible(true)}
            style={styles.inputContainer}
          >
            <Text style={styles.label}>Ngày ngừng uống</Text>

            <Text style={[styles.input, { lineHeight: 50 }]}>
              {endDate ? endDate.toLocaleDateString() : undefined}
            </Text>
          </Pressable>

          {/* ===================== TẦN SUẤT ===================== */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Tần suất <Text style={styles.requiredMark}>*</Text>
            </Text>

            <Controller
              control={control}
              name="frequency_type"
              render={({ field: { onChange, value } }) => (
                <View style={[styles.selectBox]}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={{ color: "#FFF" }}
                    dropdownIconColor="#FFF"
                  >
                    {FREQUENCY_OPTIONS.map((item) => (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />
            {errors.frequency_type && (
              <Text style={styles.errorText}>
                {errors.frequency_type.message}
              </Text>
            )}
          </View>
          {watch("frequency_type") === FREQUENCY.WEEKLY && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Chọn các ngày trong tuần{" "}
                <Text style={styles.requiredMark}>*</Text>
              </Text>

              <Pressable
                onPress={() => setShowWeekModal(true)}
                style={[styles.selectBox]}
              >
                <Text style={{ color: "#FFF" }}>
                  {daysOfWeek.length > 0
                    ? daysOfWeek.map((d) => WEEK_DAYS_DISPLAY[d]).join(", ")
                    : "Chọn ngày"}
                </Text>
              </Pressable>

              {errors.days_of_week && (
                <Text style={styles.errorText}>
                  {errors.days_of_week.message}
                </Text>
              )}
            </View>
          )}

          {watch("frequency_type") === FREQUENCY.INTERVAL && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Khoảng cách ngày <Text style={styles.requiredMark}>*</Text>
              </Text>
              <Controller
                control={control}
                name="interval_days"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value ? String(value) : ""}
                    onChangeText={(text) => {
                      const numeric = text.replace(/[^0-9]/g, "");
                      onChange(numeric);
                    }}
                    keyboardType="number-pad"
                  />
                )}
              />
              {errors.interval_days && (
                <Text style={styles.errorText}>
                  {errors.interval_days.message}
                </Text>
              )}
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ghi chú</Text>

            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    { height: 80, textAlignVertical: "top" },
                  ]}
                  multiline
                  numberOfLines={4}
                  placeholder="Nhập ghi chú (nếu có)"
                  placeholderTextColor="#999"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            {errors.note && (
              <Text style={styles.errorText}>{errors.note.message}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Thời gian
              <Text style={styles.requiredMark}>*</Text>
            </Text>

            {schedules.length > 0
              ? schedules.map((s, index) => (
                  <ScheduleCard
                    key={index}
                    name={getValues("drugName")}
                    time={s.time}
                    dosage={s.dosage}
                    mode="edit"
                    onPress={() => {
                      setEditingIndex(index);
                      setAddTimeVisible(true);
                    }}
                    onDelete={() => handleDeleteSchedule(index)}
                  />
                ))
              : null}
            <Pressable
              style={styles.secondaryButton}
              onPress={() => setAddTimeVisible(true)}
            >
              <Text style={styles.secondaryButtonText}>+ Thêm giờ</Text>
            </Pressable>
            {errors.schedules && (
              <Text style={styles.errorText}>{errors.schedules.message}</Text>
            )}
          </View>
          {/* ===================== LƯU ===================== */}
          <Pressable
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
            disabled={addMedication.isPending}
          >
            <Text style={styles.saveText}>Lưu</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>

      {/* ===================== DATE PICKER ===================== */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setStartDatePickerVisible(false);
          setValue("start_date", value);
        }}
        onCancel={() => setStartDatePickerVisible(false)}
        locale="vi-VN"
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setEndDatePickerVisible(false);
          setValue("end_date", value);
        }}
        onCancel={() => setEndDatePickerVisible(false)}
        locale="vi-VN"
      />

      <CheckBoxDaysModal
        showWeekModal={showWeekModal}
        setShowWeekModal={setShowWeekModal}
        setValue={setValue}
        control={control}
      />

      <AddTimeModal
        visible={addTimeVisible}
        setVisible={setAddTimeVisible}
        schedules={schedules}
        setValue={setValue}
        editingIndex={editingIndex}
      />
    </LinearGradient>
  );
}
